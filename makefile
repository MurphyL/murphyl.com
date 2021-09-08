CONTAINER=murphyl.com

SERVE_PORT?=3000

start: v2/start

v2/init:
	docker run --rm -v $(CURDIR):/usr/murph murphyl/nodejs npx create-react-app v2

v2/start: 
	docker run -it --rm --name $(CONTAINER) -v $(CURDIR)/v2:/usr/murph -p $(SERVE_PORT):3000 murphyl/nodejs npm run start

v2/update:
	docker run --rm -v $(CURDIR)/v2:/usr/murph murphyl/nodejs npm update

v1/start: 
	docker run -it --rm --name $(CONTAINER) -v $(CURDIR)/v1:/usr/murph -p $(SERVE_PORT):5000 -p 35729:35729 murphyl/nodejs npm run dev

v1/update:
	docker run --rm -v $(CURDIR)/v1:/usr/murph murphyl/nodejs npm update

v1/install:
	docker run --rm -v $(CURDIR)/v1:/usr/murph murphyl/nodejs npm install