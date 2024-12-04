# In-Chrome AI

![Google Chrome Built-in AI demo GIF](./google-chrome-built-in-ai.gif)

A Google Chrome Extension that provides AI-powered suggestions for text input
using [Gemini Nano](https://deepmind.google/technologies/gemini/nano/), Google's
language model in the browser.

This project is only one of the many possible applications of Chrome's built-in
AI capabilities. The extension is built using Deno and TypeScript.

## Inspiration

We were inspired by the potential of Google's Gemini Nano, a powerful language
model now available directly in the browser. We envisioned a Chrome Extension
that leverages this readily available AI to enhance user productivity and
streamline text input across various websites. The goal was to create a
practical and useful application demonstrating the power of Chrome's integrated
AI capabilities.

## What it does

This Google Chrome Extension provides AI-powered suggestions for text input
using Gemini Nano. As a user types in any editable field (e.g., text boxes,
search bars, code editors), the extension analyzes the entered text and
generates relevant and contextually appropriate suggestions in real-time. This
helps users write faster, more efficiently, and with improved accuracy.

## How we built it

The extension is built using Deno and TypeScript, leveraging the robustness and
type safety of these technologies. Deno's efficient build system and
TypeScript's strong typing capabilities made development faster and more
reliable. The extension interacts with Gemini Nano through the browser's
built-in API to receive AI-powered suggestions. The development process included
using Deno's built-in tooling for building (`deno task build`), formatting
(`deno fmt`), and linting (`deno lint`).

## Challenges we ran into

One challenge was optimizing the performance of the extension to ensure
responsiveness even with large inputs. Balancing the speed of suggestion
generation with the accuracy of the suggestions required careful consideration.
Another challenge involved handling diverse input types and contexts across
different websites, ensuring that suggestions remained relevant and helpful
regardless of the webpage.

## Accomplishments that we're proud of

We successfully built a functional Chrome Extension that seamlessly integrates
with Gemini Nano. The extension provides helpful suggestions in real-time,
enhancing the user experience across a broad range of websites. We're
particularly proud of the clean and efficient codebase achieved through the use
of Deno and TypeScript. The project showcases the ease and speed of developing
Chrome extensions with built-in AI capabilities.

## What we learned

This project taught us valuable lessons in browser extension development,
efficient use of AI language models, and the importance of performance
optimization. We gained experience working with Deno and TypeScript in a
real-world application, and learned how to effectively integrate a language
model into a user-facing application. The experience highlighted the immense
potential of browser-integrated AI to revolutionize user interactions with web
applications.

## Future work

We believe that Chrome's built-in AI capabilities represent a significant step
towards more intelligent and intuitive web experiences. Future development could
explore enhancing context awareness, personalizing suggestions based on user
preferences and history, and integrating other AI features to create even more
powerful and helpful extensions.

## Development

Install Deno: <https://docs.deno.com/runtime/>

Format the source code:

```sh
deno fmt
```

Run the linter:

```sh
deno lint
```

Generate trial token for trial,
[_Trial for Prompt API for Chrome Extensions_](https://developer.chrome.com/origintrials/#/view_trial/320318523496726529).

Update the `.env` file:

```sh
TRIAL_TOKEN_PROMPT_API_FOR_CHROME_EXTENSIONS=""
```

Generate [Gemini API token](https://aistudio.google.com/app/apikey) (acts as a
fallback for when Gemini Nano is not available):

Update the `.env` file:

```sh
GEMINI_API_TOKEN=""
```

Run the build command to bundle extension files in the `unpacked` directory:

```sh
deno task build
```

Load the unpacked extension in Google Chrome:

1. Open the Extension Management page by navigating to
   [`chrome://extensions`](chrome://extensions/).
   - The Extension Management page can also be opened by clicking on the Chrome
     menu, hovering over `More Tools` then selecting `Extensions`.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the `Load unpacked` button and select the extension directory.

## References

- <https://googlechromeai.devpost.com/resources>
- <https://developer.chrome.com/docs/extensions/develop/ui/context-menu>
- <https://developer.chrome.com/docs/extensions/ai/prompt-api>
- <https://developer.chrome.com/docs/ai/built-in>

---

Developed during the
[Google Chrome Built-in AI Challenge](https://googlechromeai.devpost.com/) by
[**@EthanThatOneKid**](https://etok.codes/)
