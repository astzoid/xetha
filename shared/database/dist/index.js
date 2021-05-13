"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGODB_URI ?? 'mongodb://localhost/xetha', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}, function mongooseConnect(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});
exports.default = mongoose_1.default;
tslib_1.__exportStar(require("./lib/Blacklisted"), exports);
tslib_1.__exportStar(require("./lib/Guild"), exports);
tslib_1.__exportStar(require("./lib/Member"), exports);
tslib_1.__exportStar(require("./lib/Profile"), exports);
tslib_1.__exportStar(require("./lib/User"), exports);
//# sourceMappingURL=index.js.map