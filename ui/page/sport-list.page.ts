import { GetSportDto } from "../../server/sports/sports.dto";
import { SportForm } from "../component/sport-form.component";
import { SportList } from "../component/sport-list.component";
import { Column, Heading2 } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface SportListModel extends PageModel {
    sports: GetSportDto[];
}

export const SportListPage: Page<SportListModel> = (model: SportListModel) => {

    return Layout(model,
        Column(
            Heading2("List of all sports"),
            SportList(model.sports),
            Heading2("Add new sport: "),
            SportForm({ user: model.user })
        )
    )

}
