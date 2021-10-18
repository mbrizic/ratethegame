import { getAppConfig } from "../server/core/app.config";
import { UserSettings } from './component/user-settings.component'
import { Logout } from "./component/logout.component";
import { readCssFiles } from "./core/css.service";
import { Body, ChildElement, Footer, Head, Header, Heading1, Html, Link, Style, Text, Title } from "./core/html.elements";
import { PageModel } from "./core/html.interfaces";
import { Inline } from "./core/html.operator";

export const Layout = (model: PageModel, ...children: ChildElement[]) => {

    const css = readCssFiles(
        "./ui/style/base.css",
        "./ui/style/framework.css",
        "./ui/style/app.css"
    );

    const callToActionButton = getAppConfig().isDebugMode
        ? Link({ text: "Log in", href: "/login" })
        : Link({ text: "Sign up", href: "/register" })

    const headerWithNavigation = Header(
        Heading1(
            Link({ text: "Rate the game", href: "/" }),
        ),
        Link({ text: "Sports", href: "/sports" }),
        Link({ text: "Events", href: "/events" }),
        model.user
            ? Inline(
                Text(model.user.email),
                UserSettings(model.user.id),
                Logout()
            )
            : callToActionButton
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
