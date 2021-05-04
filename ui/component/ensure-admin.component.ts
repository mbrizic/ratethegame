import { PotentialUser } from "../../server/users/users.dto"

export const EnsureAdmin = (user: PotentialUser, ...children: string[]) => {

    if (user?.isAdmin) {
        return children.join("")
    } 

    return null
}