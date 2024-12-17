import DesplegableRepositoryImpl from "./DesplegableRepositoryImpl"

export default {
	getInstance () {
		return new DesplegableRepositoryImpl()
	}
}
