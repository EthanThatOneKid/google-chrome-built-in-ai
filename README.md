# google-chrome-built-in-ai

![Google Chrome Built-in AI demo GIF](./google-chrome-built-in-ai.gif)

A Google Chrome Extension that provides AI-powered suggestions for text input
using [Gemini Nano](https://deepmind.google/technologies/gemini/nano/), Google's
language model in the browser.

This project is only one of the many possible applications of Chrome's built-in
AI capabilities. The extension is built using Deno and TypeScript.

## Benefits of running client-side

> With a built-in AI approach, it becomes trivial to perform AI tasks
> client-side, which in turn offers the following upsides:
>
> - **Local processing of sensitive data**: Client-side AI can improve your
>   privacy story. For example, if you work with sensitive data, you can offer
>   AI features to users with end-to-end encryption.
> - **Snappy user experience**: In some cases, ditching the round trip to the
>   server means you can offer near-instant results. Client-side AI can be the
>   difference between a viable feature and a sub-optimal user experience.
> - **Greater access to AI**: Your users' devices can shoulder some of the
>   processing load in exchange for more access to features. For example, if you
>   offer premium AI features, you could preview these features with client-side
>   AI so that potential customers can see the benefits of your product, without
>   additional cost to you. This hybrid approach can also help you manage
>   inference costs especially on frequently used user flows.
> - **Offline AI usage**: Your users can access AI features even when there is
>   no internet connection. This means your sites and web apps can work as
>   expected offline or with variable connectivity.

## Development

Install Deno: <https://docs.deno.com/runtime/>

Run the build command to bundle extension files in the `unpacked` directory:

```sh
deno task build
```

Format the source code:

```sh
deno fmt
```

Run the linter:

```sh
deno lint
```

Load the unpacked extension in Google Chrome:

1. Open the Extension Management page by navigating to
   [`chrome://extensions`](chrome://extensions/).
   - The Extension Management page can also be opened by clicking on the Chrome
     menu, hovering over `More Tools` then selecting `Extensions`.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the `Load unpacked` button and select the extension directory.

## Future work

- Enhance the relevance of suggestions by supplying additional context to the
  language model regarding the current webpage.

## References

- <https://googlechromeai.devpost.com/resources>
- <https://developer.chrome.com/docs/extensions/develop/ui/context-menu>
- <https://developer.chrome.com/docs/extensions/ai/prompt-api>

---

Developed during the
[Google Chrome Built-in AI Challenge](https://googlechromeai.devpost.com/) by
[**@EthanThatOneKid**](https://etok.codes/)
