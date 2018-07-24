function sw() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('worker.js', {scope: '/'}).then(reg => {
            
            if (reg.installing) {
                console.log('installing, 正在安装');
            } else if (reg.waiting) {
                console.log('installed 安装完');
            } else if (reg.active) {
                console.log('active 活跃');
            }
            
        }).catch(err => {
                console.log(err);
            }
        );
    }
}

sw();