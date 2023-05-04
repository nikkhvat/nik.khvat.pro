package models

type SignIn struct {
	Mail     string `json:"mail"`
	Password string `json:"password"`
}

// swagger:model SingUpResp
type SingUpResp struct {
	Token string `json:"token"`
}
