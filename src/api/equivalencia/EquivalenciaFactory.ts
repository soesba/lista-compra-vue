import EquivalenciaRepositoryImpl from "./EquivalenciaRepositoryImpl"

export default {
	getInstance () {
		return new EquivalenciaRepositoryImpl()
	}
}
