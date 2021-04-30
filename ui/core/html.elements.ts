export const Html = (...children: string[]) => 
    `<html>${children.join("")}</html>`

export const Head = (...children: string[]) => 
    `<head>${children.join("")}</head>`

export const Body = (...children: string[]) => 
    `<body>${children.join("")}</body>`

export const Style = (...children: string[]) => 
    `<style>${children.join("")}</style>`

export const Title = (text: string) => 
    `<title>${text}</title>`

export const Script = (...children: string[]) => 
    `<script>${children.join("")}</script>`

export const Heading1 = (children: string, options: BasicAttributes = {}) => 
    `<h1 ${addBasicAttributes(options)}>
        ${children}
    </h1>`

export const Heading2 = (children: string, options: BasicAttributes = {}) => 
    `<h2 ${addBasicAttributes(options)}>
        ${children}
    </h2>`

export const Heading3 = (children: string, options: BasicAttributes = {}) => 
    `<h3 ${addBasicAttributes(options)}>
        ${children}
    </h3>`

export const Heading4 = (children: string, options: BasicAttributes = {}) => 
    `<h4 ${addBasicAttributes(options)}>
        ${children}
    </h4>`

export const ListItem = (children: string, options: BasicAttributes = {}) => 
    `<li>${children}</li>`

export const UnorderedList = (...children: string[]) => 
    `<ul>${children.join("")}</ul>`

export const Link = (options: { text: string, href: string }) => 
    `<a href="${options.href}">${options.text}</a>`

export const Span = (options: { text: string, class?: string }) =>
    `<span class="${options?.class ?? ""}">${options.text}</span>`

export const Tag = (text: string) =>
    `<span class="tag">${text}</span>`

export const Text = (text: string) =>
    `<span>${text}</span>`

export const Row = (...children: string[]) =>
    `<div class="row">${children.join("")}</div>`

export const RowSpaced = (...children: string[]) =>
    `<div class="row spaced">${children.join("")}</div>`

export const Column = (...children: string[]) =>
    `<div class="column">${children.join("")}</div>`

export const Image = (options: { src: string, text: string, class?: string }) =>
    `<img src="${options.src}" alt="${options.text}" loading="lazy"/>`

export const Paragraph = (...text: string[]) =>
    `<p>${text.join("")}</p>`

export const BlockQuote = (text: string) =>
    `<blockquote>${text}</blockquote>`

export const Code = (text: string) =>
    `<span class="code">${text}</span>`

export const Strong = (text: string) =>
    `<strong>${text}</strong>`

export const Italic = (text: string) =>
    `<em>${text}</em>`

export const Footer = (children: string) =>
    `<footer>${children}</footer>`

export const Form = (action: string, ...children: string[]) =>
    `<form method="POST" action="${action}">${children.join("")}</form>`

export const SubmitButton = (...children: string[]) =>
    `<button type="submit">${children}</button>`

export const TextInput = (options: FormInputAttributes) =>
    `<input placeholder="${options.placeholder}" name="${options.name}" value="${options.value || ''}" type="text"></input>`

export const PasswordInput = (options: FormInputAttributes) =>
    `<input placeholder="${options.placeholder}" name="${options.name}" value="${options.value || ''}" type="password"></input>`

export const HiddenInput = (options: FormInputAttributes) =>
    `<input placeholder="${options.placeholder}" name="${options.name}" value="${options.value}" type="hidden"></input>`

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

    return output
}

export interface BasicAttributes {
    id?: string;
    class?: string;
    onClick?: string;
}

export interface FormInputAttributes {
    name: string;
    placeholder?: string;
    value?: string | number | boolean; 
}