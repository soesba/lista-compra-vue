import ConfiguracionRepositoryImpl from "./ConfiguracionRepositoryImpl"

export default {
	getInstance () {
		return new ConfiguracionRepositoryImpl()
	}
}
