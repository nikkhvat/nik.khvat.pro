package links

type UseCase interface {
	ToLink(link, page string) error
}
