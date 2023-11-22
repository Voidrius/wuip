# React 18 Features - Exercise 10

## A. How does the new concurrency work, and what is the main difference compared to the old version of React's rendering model?

The new concurrency model introduces the concept of "concurrent rendering." This allows React to work on multiple tasks simultaneously, prioritizing more important updates and rendering components without blocking the entire process. Unlike the previous synchronous rendering, concurrent rendering enhances performance and responsiveness by efficiently managing component updates.

## B. What is a `<Suspense>` component, and give one example where it should be used?

`<Suspense>` enables better handling of asynchronous operations and code-splitting. It allows components to "suspend" rendering until a specified resource (like data or code) is ready. An example use case is lazy-loading components or data fetching. For instance, when fetching data asynchronously, `<Suspense>` can be used to show a loading indicator until the data is available.

## C. When should you use SSR (Server-Side Rendering) and when not?

Server-Side Rendering (SSR) is beneficial when you want to improve SEO, initial page load performance, or provide a better experience for users with slower internet connections. SSR is useful for static pages or content-heavy applications. However, for highly dynamic, client-heavy applications, where initial load performance is less critical, you might opt for Client-Side Rendering (CSR) for its simplicity.

## D. What is a `useTransition()` hook, and where should it be used?

useTransition is a React Hook that lets you update the state without blocking the UI. It helps to create smooth transitions between different states of a component, allowing UI updates to appear more visually appealing and responsive. 

## E. What is a `useId` hook, and where should it be used?

useId is a new Hook for generating unique IDs on both the client and server, while avoiding hydration mismatches. It is primarily useful for component libraries integrating with accessibility APIs that require unique IDs. 

## F. Did you find some other good new feature? Just name it and explain why the feature is a good one.

Automatic batching optimizes the handling of multiple state updates, bundling them into a single render cycle. This improves performance by reducing the number of renders and potentially re-renders, leading to a smoother user experience.