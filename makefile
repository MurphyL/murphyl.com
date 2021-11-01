CONTAINER=murphyl.com

JS_SERVE_PORT?=3000

TS_SERVE_PORT?=5000

VERSION?=site

options=-e REACT_APP_GHP_ISSUE_STATES="OPEN,CLOSED" -e REACT_APP_GHP_TOKEN=$(GHP_MURPHYL_COM) 

start: 
	docker run --rm -it --name $(CONTAINER) $(options) -v $(CURDIR)/$(VERSION):/usr/murph -p $(JS_SERVE_PORT):3000 murphyl/nodejs npm run start

install: 
	docker run --rm -it --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs npm install

vm: 
	docker run --rm -it --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs
