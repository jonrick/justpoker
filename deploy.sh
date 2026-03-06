# build docker image
echo "building docker image...";
docker build --build-arg build_env=PROD -t justpoker ./;

echo "Built justpoker:latest";

# Example: Push to a registry
# docker tag justpoker your-registry/justpoker:latest
# docker push your-registry/justpoker:latest

