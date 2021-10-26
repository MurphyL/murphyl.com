CONTAINER=murphyl.com

JS_SERVE_PORT?=3000

TS_SERVE_PORT?=5000

VERSION?=site

options=-e REACT_APP_GHP_ISSUE_STATES="OPEN,CLOSED" -e REACT_APP_GHP_TOKEN=$(GHP_MURPHYL_COM) 

run/js: 
	docker run --rm -it --name $(CONTAINER).js $(options) -v $(CURDIR)/$(VERSION):/usr/murph -p $(JS_SERVE_PORT):3000 murphyl/nodejs npm run start

run/ts:
	docker run --rm -it --name $(CONTAINER).ts $(options) -v $(CURDIR)/$(VERSION).ts:/usr/murph -p $(TS_SERVE_PORT):3000 murphyl/nodejs npm run start

vm/js: 
	docker run --rm -it --name $(CONTAINER) $(options) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs

vm/ts: 
	docker run --rm -it --name $(CONTAINER).ts $(options) -v $(CURDIR)/$(VERSION).ts:/usr/murph murphyl/nodejs
