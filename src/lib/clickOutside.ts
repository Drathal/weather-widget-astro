import { onCleanup } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: ClickOutside;
    }
  }
}

interface ClickOutside {
  (el: Element, accessor: () => (() => void) | void): void;
}

const clickOutside: ClickOutside = (el, accessor) => {
  const onClick = (e: MouseEvent) => {
    return !el.contains(e.target as Node) && accessor()?.();
  };

  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
};

export default clickOutside;
