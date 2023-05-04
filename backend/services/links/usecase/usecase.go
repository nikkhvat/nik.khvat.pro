package usecase

import (
	"nik19ta/backend/services/links"
)

type LinksUseCase struct {
	userRepo links.LinkRepository
}

func NewLinkUseCase(userRepo links.LinkRepository) *LinksUseCase {
	return &LinksUseCase{userRepo: userRepo}
}

func (a *LinksUseCase) ToLink(link, page string) error {
	if link == "" {
		return links.LinkCannotBeEmpty
	}

	if page == "" {
		return links.PageCannotBeEmpty
	}

	err := a.userRepo.SaveStat(link, page)
	return err
}
