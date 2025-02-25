import { Page } from "@/shared/ui/components/page/page"
import { FC } from "react"

export const LoginPage: FC = () => {
	return (
		<Page back={true}>
			<form className="p-4 w-full flex flex-col gap-4 items-center justify-center">
				<h1>Авторизация</h1>
				<input type="email" placeholder="Почта" className="input input-primary w-full" />
				<input type="password" placeholder="Пароль" className="input input-primary w-full" />
				<button className="btn btn-primary w-full">Войти</button>
			</form>
		</Page>
	)
}