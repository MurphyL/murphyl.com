import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

class Process {

	start() {
		NProgress.start();
	}

	end() {
		NProgress.done();
	}

}

export default new Process();