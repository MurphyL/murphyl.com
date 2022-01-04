CONTAINER=murphyl.com

JS_SERVE_PORT?=3000

VERSION?=site

options=-e REACT_APP_GHP_ISSUE_STATES="OPEN,CLOSED" -e REACT_APP_GHP_TOKEN=$(GHP_MURPHYL_COM) -p $(JS_SERVE_PORT):3000

mounts=-v $(CURDIR)/$(VERSION):/usr/murph -v $(CURDIR)/snippets:/usr/snippets

start: 
	docker run --rm -it --name $(CONTAINER) $(options) $(mounts) murphyl/nodejs npm run start

vm: 
	docker run --rm -it --name $(CONTAINER) $(options) $(mounts) murphyl/nodejs
