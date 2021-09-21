CONTAINER=murphyl.com

SERVE_PORT?=3000

VERSION?=site

start: 
	docker run --rm -it --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph -p $(SERVE_PORT):3000 murphyl/nodejs npm run start

update:
	docker run --rm --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs npm update
	
install:
	docker run --rm --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs npm clean-install
