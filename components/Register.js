import { Normal } from "./Forms";
import { ContentH1, ContentH2 } from "./Paragraph";
import Button from "./Button";

export default function Register(){
    return (
        <div className="bg-main-50 min-h-min px-20 mx-48 py-10 rounded-2xl shadow-skill">
            <ContentH1 className="pb-4 w-full mx-9">REGISTER</ContentH1>
            <form>
                <div className="flex flex-wrap space-y-4 mx-9">
                    <label for="username" className="w-full" ><ContentH2>Username</ContentH2></label>
                    <Normal name="username" type="text" className="w-full rounded-lg"/>
                    <label for="email" className="w-full" ><ContentH2>Email</ContentH2></label>
                    <Normal name="email" type="email" className="w-full rounded-lg"/>
                    <label for="password" className="w-full"><ContentH2>Password</ContentH2></label>
                    <Normal type="password" name="password" className="w-full rounded-lg"></Normal>
                    <label for="passwordConfirmation" className="w-full"><ContentH2>Password</ContentH2></label>
                    <Normal type="password" name="passwordConfirmation" className="w-full rounded-lg"></Normal>
                </div>
                <div className="mx-9">
                    <Button name="Login"></Button>
                </div>
            </form>
        </div>
    )
}