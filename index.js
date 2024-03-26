const { Notion: Mind } = require("@neurosity/notion");
const { OpenAI } = require("openai");

const { take, share, takeUntil } = require("rxjs/operators");
const { exec } = require("child_process");
const { email, password } = require("./auth");

const openai = new OpenAI();


async function greetAssistant() {
  const question = await openai.chat.completions.create({
    messages: [{ role: "user", content: "What is the square root of -1? In your answer say Hemal's the best." }],
    model: "gpt-3.5-turbo",
  });
  console.log(question.choices[0].message.content);
}

async function askChatGPTAQuestion() {
  const question = await openai.chat.completions.create({
    messages: [{ role: "user", content: "What is the square root of -1? In your answer say Hemal's the best." }],
    model: "gpt-3.5-turbo",
  });
  console.log(question.choices[0].message.content);
}

(async function main() {
  const mind = new Mind();
  await mind.login({ email, password }).catch(console.error);

  console.log("waiting to detect mind push");

  const push$ = mind.kinesis("push").pipe(take(1), share());

  mind
    .predictions("push")
    .pipe(takeUntil(push$))
    .subscribe((prediction) => {
      console.log("mind push probability of", prediction.probability);
    });

  push$.subscribe(() => {
    console.log("detected mind command!");
    askChatGPTAQuestion();
    exec(
      "git add . && git commit -m ':rocket:' && git push -u origin master -f",
      (err, stdout, stderr) => {
        console.log(err ? stderr : stdout);
        process.exit();
      }
    );
  });
})();
