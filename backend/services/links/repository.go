package links

type LinkRepository interface {
	SaveStat(link, page string) error
}
