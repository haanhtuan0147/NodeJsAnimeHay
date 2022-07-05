
module.exports= class BaseController {
    sendResponse = (result, req, res) => {
        return new Promise((resolve, reject) => {
            if (res) {
                res.set('Cache-Control', 'no-cache,no-store');
                res.json(result)
            }
            resolve();
        });
    };
}