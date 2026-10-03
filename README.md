# Arun Thomas Portfolio

## Contact form setup

The contact form uses Formspree to deliver submissions without exposing an email password in the browser.

1. Create an account at [Formspree](https://formspree.io/register) using `arun37579@gmail.com` and verify the email address.
2. Create a **New Form** and set its target email to `arun37579@gmail.com`.
3. Copy the form ID from the endpoint shown under **Integration**. For example, if the endpoint is `https://formspree.io/f/abcxyz`, copy `abcxyz`.
4. Copy `.env.example` to `.env` and replace `your_form_id` with that ID:

   ```env
   VITE_FORMSPREE_FORM_ID=abcxyz
   ```

5. Restart the development server. For a deployed site, add the same `VITE_FORMSPREE_FORM_ID` environment variable in the hosting provider and redeploy.

Test the deployed form once and confirm the first Formspree verification email if prompted. New messages will then be delivered to `arun37579@gmail.com`, and the visitor's email is included as the reply-to address.

## Development

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
