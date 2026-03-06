/// <reference types="vite/client" />

declare module '*.mdx' {
  import { Component } from 'solid-js';
  const component: Component;
  export default component;
}
