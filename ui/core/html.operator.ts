import { ChildElement } from "./html.elements"

export function Inline(...elements: ChildElement[]): ChildElement {
    return elements.join(" ")
}

// Takes some JS, executes it and puts execution result into span element
export function ExecuteJsAndDisplayResult(code: string) {
    return `<span>
                <script>
                    document.currentScript.parentElement.textContent = ${code.trim()}
                </script>
            </span>`
}

export function ExecuteJs(code: string) {
    return `<script>${code}; document.currentScript.remove()</script>`
}