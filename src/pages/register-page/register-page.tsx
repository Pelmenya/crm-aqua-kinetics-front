import { Page } from "@/shared/ui/components/page/page"
import { FC } from "react"

export const RegisterPage: FC = () => {
	return (
		<Page back={true}>
			<form className="p-4 flex flex-col gap-4 items-center justify-center">
				<h1>Регистрация</h1>
				<input type="text" placeholder="Имя" className="input input-primary" />
				<input type="text" placeholder="Фамилия" className="input input-primary" />
				<input type="text" placeholder="Телефон" className="input input-primary" />
				<button className="btn btn-primary">Зарегистрироваться</button>
			</form>
		</Page>
	)
}