import { readFile } from "../server/core/file.service";
import { Logout } from "./component/logout.component";
import { Body, Footer, Head, Header, Heading1, Html, Link, Style, Text, Title } from "./core/html.elements";
import { PageModel } from "./core/html.interfaces";
import { Inline } from "./core/html.operator";

export const Layout = (model: PageModel, ...children: string[]) => {

    const baseCss = readFile("./ui/style/base.css")
    const frameworkCss = readFile("./ui/style/framework.css")
    const appCss = readFile("./ui/style/app.css")

    const headerWithNavigation = Header(
        Heading1(
            Link({ text: "Rate the game", href: "/" }),
        ),
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
            Style(frameworkCss, baseCss, appCss),
        ),
        Body(
            headerWithNavigation,
            ...children,
            Footer("This is footer.")
        )
    )

}
