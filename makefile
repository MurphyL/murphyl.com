CONTAINER=murphyl.com

JS_SERVE_PORT?=3000

TS_SERVE_PORT?=5000

VERSION?=site

options=-e REACT_APP_GHP_ISSUE_STATES="OPEN,CLOSED" -e REACT_APP_GHP_TOKEN=$(GHP_MURPHYL_COM) -p $(JS_SERVE_PORT):3000

start: 
	docker run --rm -it --name $(CONTAINER) $(options) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs npm run start

vm: 
	docker run --rm -it --name $(CONTAINER) $(options) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs
