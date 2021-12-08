// nonvisual tags

export const Html = (...children: ChildElement[]) => 
    `<html>${children.join("")}</html>`

export const Head = (...children: ChildElement[]) => 
    `<head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${children.join("")}
    </head>`

export const Body = (...children: ChildElement[]) => 
    `<body>${children.join("")}</body>`

export const Style = (...children: ChildElement[]) => 
    `<style>${children.join("")}</style>`

export const Script = (...children: ChildElement[]) => 
    `<script>${children.join("")}</script>`

// meta tags

export const Title = (text: string) => 
    `<title>${text}</title>`

// visual tags

export const Heading1 = (children: ChildElement, options: BasicAttributes = {}) => 
    `<h1 ${addBasicAttributes(options)}>
        ${children}
    </h1>`

export const Heading2 = (children: ChildElement, options: BasicAttributes = {}) => 
    `<h2 ${addBasicAttributes(options)}>
        ${children}
    </h2>`

export const Heading3 = (children: ChildElement, options: BasicAttributes = {}) => 
    `<h3 ${addBasicAttributes(options)}>
        ${children}
    </h3>`

export const Heading4 = (children: ChildElement, options: BasicAttributes = {}) => 
    `<h4 ${addBasicAttributes(options)}>
        ${children}
    </h4>`

export const ListItem = (children: string, options: BasicAttributes = {}) => 
    `<li>${children}</li>`

export const UnorderedList = (...children: ChildElement[]) => {
    if (children.length == 0) {
        return ''
    }
    return `<ul>${children.join("")}</ul>`
} 
    
export const Link = (required: { text: string, href: string }, options: BasicAttributes = {}) => 
    `<a href="${required.href}" ${addBasicAttributes(options)}>${required.text}</a>`

export const Span = (options: { text: string, class?: string }) =>
    `<span class="${options?.class ?? ""}">${options.text}</span>`

export const Tag = (text: string) =>
    `<span class="tag">${text}</span>`

export const Div = (children: ChildElement, options: BasicAttributes = {}) =>
    `<div ${addBasicAttributes(options)}>${children}</div>`

export const Text = (...text: ChildElement[]) =>
    `<span>${text.join("")}</span>`

export const Styled = (options: BasicAttributes = {}, ...text: ChildElement[]) =>
    `<span ${addBasicAttributes(options)}>${text.join("")}</span>`

export const Image = (options: { src: string, text: string, class?: string }) =>
    `<img src="${options.src}" alt="${options.text}" loading="lazy"/>`

export const Paragraph = (text: string, options: BasicAttributes = {}) =>
    `<p ${addBasicAttributes(options)}>${text}</p>`

export const BlockQuote = (text: string) =>
    `<blockquote>${text}</blockquote>`

export const Code = (text: string) =>
    `<span class="code">${text}</span>`

export const Strong = (text: string) =>
    `<strong>${text}</strong>`

export const Italic = (text: string) =>
    `<em>${text}</em>`

export const Small = (text: string) =>
    `<small>${text}</small>`

export const Big = (text: string) =>
    `<big>${text}</big>`

export const Spacing = () =>
    `<div class="spacing"></div>`

// semantic tags

export const Header = (...children: ChildElement[]) =>
    `<header>${children.join("")}</header>`

export const Navigation = (...children: ChildElement[]) =>
    `<nav>${children.join("")}</nav>`

export const Footer = (...children: ChildElement[]) =>
    `<footer>${children.join("")}</footer>`

export const Row = (...children: ChildElement[]) =>
    `<div class="row">${children.join("")}</div>`

export const RowSpaced = (...children: ChildElement[]) =>
    `<div class="row spaced">${children.join("")}</div>`

export const RowCentered = (...children: ChildElement[]) =>
    `<div class="row centered">${children.join("")}</div>`

export const Grid = (...children: ChildElement[]) =>
    `<div class="grid">${children.join("")}</div>`

export const Column = (...children: ChildElement[]) =>
    `<div class="column">${children.join("")}</div>`

export const ColumnCentered = (...children: ChildElement[]) =>
    `<div class="column centered">${children.join("")}</div>`

// forms

export const Form = <T> (action: string, ...children: FormInputElement<T>[]) =>
    `<form method="POST" action="${action}">${children.join("")}</form>`

export const SubmitButton = (text: ChildElement, options: BasicAttributes = {}) =>
    `<button type="submit" ${addBasicAttributes(options)}>${text}</button>`

export const Label = (text: ChildElement, options: BasicAttributes = {}) =>
`<label ${addBasicAttributes(options)}>${text}</label>`

export const SubmitLink = (text: ChildElement, options: BasicAttributes = {}) => {
    options.class = options.class += " btn-link"
    return `<button type="submit" ${addBasicAttributes(options)}>${text}</button>`
}

export const TextInput: FormInputFunction = <T> (options: FormInputAttributes<T>) =>
    `<input placeholder="${options.placeholder}" name="${options.name}" value="${options.value || ''}" type="text"></input>`

export const DateInput: FormInputFunction = <T> (options: FormInputAttributes<T>) =>
    `<input placeholder="${options.placeholder}" name="${options.name}" value="${options.value || ''}" type="datetime-local"></input>`

export const PasswordInput: FormInputFunction = <T> (options: FormInputAttributes<T>) =>
    `<input placeholder="${options.placeholder}" name="${options.name}" value="${options.value || ''}" type="password"></input>`

export const HiddenInput: FormInputFunction = <T> (options: FormInputAttributes<T>) =>
    `<input placeholder="${options.placeholder}" name="${options.name}" value="${options.value}" type="hidden"></input>`

type FormInputElement<T> = FormInputResult<T> | string | null
type FormInputFunction = <T> (options: FormInputAttributes<T>) => FormInputResult<T>
interface FormInputResult<T> extends String { }

export interface FormInputAttributes<T> {
    name: keyof T;
    placeholder?: string;
    value?: string | number | boolean; 
}

function addBasicAttributes(options: BasicAttributes) {
    let output = ""
    
    if (options.id) {
        output += `id="${options.id}" `
    }

    if (options.class) {
        output += `class="${options.class}"`
    }

    if (options.onClick) {
        output += `onClick="${options.onClick}"`
    }

    if (options.style) {
        output += `style="${options.style}"`
    }

    return output
}

export interface BasicAttributes {
    id?: string;
    class?: string;
    onClick?: string;
    style?: string;
}

export type ChildElement = string | null