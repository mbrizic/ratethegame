import { RowSpaced } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { UserModel } from "../page/user.page"
import { UserSettingComponent } from "./user-setting.component"

export const UserSettingsList: Component<UserModel> = (user: UserModel) => {

    return RowSpaced(
        ...user.settings.getSettings().map(setting => UserSettingComponent({user: user.user, userSettings: setting}))
    )

}