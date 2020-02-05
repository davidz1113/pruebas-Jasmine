function expect(actual) {
    return {
        toBe(expect) {
            if (actual !== expect) {
                throw new Error('Prueba no exitosas');
            }
        }
    };
}

function it(title, callback) {
    try {
        callback();
        console.log(`♪ ${title}`);
    } catch{
        console.error(`x ${title}`);
    }
}