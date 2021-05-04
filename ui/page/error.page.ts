import { Column, Heading2, Paragraph } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface ErrorModel extends PageModel { 
    errorMessage: string;
}

export const ErrorPage: Page<ErrorModel> = (model: ErrorModel) => {

    return Layout(model,
        Column(
            Heading2("An error occured."),
            Paragraph(model.errorMessage)
        )
    )

}
