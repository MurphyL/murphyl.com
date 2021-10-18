CONTAINER=murphyl.com

SERVE_PORT?=3000

VERSION?=site

start: 
	docker run --rm -it --name $(CONTAINER) -e REACT_APP_GHP_ISSUE_STATES="OPEN,CLOSED" -e REACT_APP_GHP_TOKEN=$(GHP_MURPHYL_COM) -v $(CURDIR)/$(VERSION):/usr/murph -p $(SERVE_PORT):3000 murphyl/nodejs npm run start

vm: 
	docker run --rm -it --name $(CONTAINER) -e REACT_APP_GHP_ISSUE_STATES="OPEN,CLOSED" -e REACT_APP_GHP_TOKEN=$(GHP_MURPHYL_COM) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs
