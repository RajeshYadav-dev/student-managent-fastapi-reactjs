from fastapi import HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.database.redis import jti_token_in_blocklist  # Corrected import
from src.security.jwtutilities import decode_token

class TokenBearer(HTTPBearer):
    def __init__(self, auto_error=True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials | None:
        cred = await super().__call__(request)
        token = cred.credentials
        token_data = decode_token(token)

        if not self.validate_token(token):  # Corrected method name
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "error": "This token is invalid or expired.",
                    "resolution": "Please get a new token.",
                },
            )

        if await jti_token_in_blocklist(token_data["jti"]):  # Fixed argument
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "error": "This token is invalid or revoked.",
                    "resolution": "Please get a new token.",
                },
            )

        self.verify_token_data(token_data)
        return token_data

    def validate_token(self, token: str) -> bool:  # Fixed spelling
        token_data = decode_token(token)
        return token_data is not None

    def verify_token_data(self, token_data):
        raise NotImplementedError("Please override this method in child classes.")

class AccessTokenBearer(TokenBearer):
    def verify_token_data(self, token_data) -> None:
        if token_data and token_data["refresh"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Please provide a valid access token.",
            )

class RefreshTokenBearer(TokenBearer):
    def verify_token_data(self, token_data) -> None:
        if token_data and not token_data["refresh"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Please provide a fresh access token.",
            )
