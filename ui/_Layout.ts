import { getAppConfig } from "../server/core/app.config";
import { Logout } from "./component/logout.component";
import { readCssFiles } from "./core/css.service";
import { Body, ChildElement, Footer, Head, Header, Heading1, Html, Link, Navigation, Paragraph, Style, Text, Title } from "./core/html.elements";
import { PageModel } from "./core/html.interfaces";
import { Inline } from "./core/html.operator";

const css = readCssFiles(
    "./ui/style/base.css",
    "./ui/style/framework.css",
    "./ui/style/app.css"
);

export const Layout = (model: PageModel, ...children: ChildElement[]) => {

    const callToActionButton = getAppConfig().isDebugMode
        ? Link({ text: "Log in", href: "/login" })
        : Link({ text: "Sign up", href: "/register" })

    const headerWithNavigation = Header(
        Heading1(
            Link({ text: "Rate the game.", href: "/" }),
            { class: "title" }
        ),
        Navigation(
            Link({ text: "Sports", href: "/sports" }),
            Link({ text: "Events", href: "/events" }),
            model.user
                ? Inline(
                    Link({ text: `Profile`, href: `/users/${model.user.id}` }),
                    Logout()
                )
                : callToActionButton
        ),
    )

    return Html(
        Head(
            Title("Rate the game"),
            Style(css),
        ),
        Body(
            headerWithNavigation,
            ...children,
            Footer(
                Paragraph("This site doesn't use client side JS,"),
                Paragraph("so it's unable to track you"),
                Paragraph("and saves your network bandwidth."),
            )
        )
    )

}
