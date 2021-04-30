import { readFile } from "../server/core/file.service";
import { Logout } from "./component/logout.component";
import { Body, Column, Footer, Head, Heading1, Html, Link, Paragraph, Row, RowSpaced, Style, Text, Title } from "./core/html.elements";
import { PageModel } from "./core/html.interfaces";

export const Layout = (model: PageModel, ...children: string[]) => {

    const css = readFile("./ui/_Layout.css")

    return Html(
        Head(
            Title("Rate the game"),
            Style(css),
        ),
        Body(
            Heading1("Rate the game", { class: "center" }),
            RowSpaced(
                Link({ text: "Home", href: "/" }),
                Link({ text: "Sports", href: "/sports" }),
                Link({ text: "Events", href: "/events" }),
                model.user
                    ? Row(
                        Text(model.user.email),
                        Logout()
                    )
                    : Link({ text: "Log in", href: "/login" }),
            ),
            ...children,
            Footer("This is footer.")
        )
    )

}
