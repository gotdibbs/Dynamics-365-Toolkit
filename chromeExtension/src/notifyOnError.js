export default function notifyOnError(fn) {
    try {
        fn.apply(this, arguments);
    }
    catch(e) {
        Honeybadger.notify(e);

        throw e;
    }
}