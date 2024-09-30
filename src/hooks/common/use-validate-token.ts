export const validateToken = async (token: string) => {
    const response = await fetch(`https://product-designer-serve.azurewebsites.net/api/validate?token=${token}`);
    return response.ok;
};
