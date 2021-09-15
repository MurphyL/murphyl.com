CONTAINER=murphyl.com

SERVE_PORT?=3000

VERSION?=v2

DOC_SOURCE=src/data/docs/*.md
DOC_TARGET=public/vendors/docs/

start: 
	docker run --rm -it --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph -p $(SERVE_PORT):3000 murphyl/nodejs npm run start

v2/docs:
	docker run --rm -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs sh -c 'mkdir -pv $(DOC_TARGET) && cp -rfv $(DOC_SOURCE) $(DOC_TARGET)'

update:
	docker run --rm --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs npm update
	
install:
	docker run --rm --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs npm clean-install

init:
	docker run --rm --name $(CONTAINER) -v $(CURDIR)/$(VERSION):/usr/murph murphyl/nodejs npm init $(VERSION)