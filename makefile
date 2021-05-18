CONTAINER=murphyl.com

SERVE_PORT?=3000

BINDING=-p $(SERVE_PORT):5000 -p 35729:35729


start: 
	docker run -it --rm --name $(CONTAINER) -v $(CURDIR):/usr/murph $(BINDING) murphyl/nodejs sh -c "npm run dev"

install:
	docker run --rm -v $(CURDIR):/usr/murph murphyl/nodejs npm install