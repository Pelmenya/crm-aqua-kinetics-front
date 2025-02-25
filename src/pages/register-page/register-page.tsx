import { Page } from "@/shared/ui/components/page/page"
import { FC } from "react"

export const RegisterPage: FC = () => {
	return (
		<Page back={true}>
			<form className="p-4 w-full flex flex-col gap-4 items-center justify-center">
				<h1>Регистрация</h1>
				<input type="text" placeholder="Имя" className="input input-primary w-full" />
				<input type="text" placeholder="Фамилия" className="input input-primary w-full" />
				<input type="phone" placeholder="Телефон" className="input input-primary w-full" />
				<input type="email" placeholder="Почта" className="input input-primary w-full" />
				<button className="btn btn-primary w-full">Зарегистрироваться</button>
			</form>
		</Page>
	)
}