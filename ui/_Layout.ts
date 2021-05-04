import { readFile } from "../server/core/file.service";
import { Logout } from "./component/logout.component";
import { Body, Footer, Head, Header, Heading1, Html, Link, Style, Text, Title } from "./core/html.elements";
import { PageModel } from "./core/html.interfaces";
import { Inline } from "./core/html.operator";

export const Layout = (model: PageModel, ...children: string[]) => {

    const css = readFile("./ui/_Layout.css")

    const headerWithNavigation = Header(
        Heading1("Rate the game"),
        Link({ text: "Home", href: "/" }),
        Link({ text: "Sports", href: "/sports" }),
        Link({ text: "Events", href: "/events" }),
        model.user
            ? Inline(
                Text(model.user.email), 
                Logout()
            )
            : Link({ text: "Log in", href: "/login" }),
    )

    return Html(
        Head(
            Title("Rate the game"),
            Style(css),
        ),
        Body(
            headerWithNavigation,
            ...children,
            Footer("This is footer.")
        )
    )

}
