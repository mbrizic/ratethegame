import { SportModel } from "../../server/sports/sports.model";
import { UserModel } from "../../server/users/users.model";
import { AdminOnlyArea } from "../component/admin-area.component";
import { EventForm } from "../component/event-form.component";
import { SportComponent } from "../component/sport.component";
import { Column } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface SportDetailsModel extends PageModel {
    sport: SportModel;
    userData: UserModel | undefined;
}

export const SportDetailsPage: Page<SportDetailsModel> = (model: SportDetailsModel) => {
    
    return Layout(model,
        Column(
            SportComponent({
                sport: model.sport, 
                userData: model.userData
            }),
            AdminOnlyArea(
                model.user,
                EventForm({
                    sportId: model.sport.id,
                    user: model.user,
                })
            )
            
        )
    )

}
