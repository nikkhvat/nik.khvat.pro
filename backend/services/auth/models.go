package auth

type SignIn struct {
	Mail     string `json:"mail"`     // main
	Password string `json:"password"` // password
}

// swagger:model SingUpResp
type SingUpResp struct {
	Token string `json:"token"` // token for authorization
}

type User struct {
	UUID     string `json:"id"`
	Mail     string `json:"mail"`
	Password string `json:"password"`
	Access   bool   `json:"access"`
}
