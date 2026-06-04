import type { Ref } from "vue";
import type { _RouterClassic} from "vue-router"
export interface RouterType{
    token:string|null,
    menuRouter:_RouterClassic,
    username:Ref,
    avatar:Ref,
}