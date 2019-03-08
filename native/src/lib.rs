#[macro_use]
extern crate neon;
extern crate kdtree;

use neon::prelude::*;
use std::fs;
use kdtree::KdTree;
use kdtree::ErrorKind;
use kdtree::distance::squared_euclidean;

pub struct ColorFinder {
    color_tree: KdTree<f32, String, [f32; 3]>
}

fn create_tree(data_file: String) -> KdTree<f32, String, [f32; 3]> {
    let dimensions = 3;
    let capacity_per_node = 3;
    let mut kdtree: KdTree<f32, String, [f32; 3]> = KdTree::new_with_capacity(dimensions, capacity_per_node);

    let text = fs::read_to_string(data_file).unwrap();
    text.lines()
        .map(|x: &str| x.split(" ").collect())
        .for_each(|p: Vec<&str>| {
            let color: [f32; 3] = [
                p[0].parse::<f32>().unwrap(),
                p[1].parse::<f32>().unwrap(),
                p[2].parse::<f32>().unwrap()
            ];
            let name: String = p[3..].join(" ");
            kdtree.add(color, name).unwrap();
        });

    return kdtree;
}

declare_types! {
    pub class JsColorFinder for ColorFinder {
        init(mut cx) {
            let data_path = cx.argument::<JsString>(0)?.value();
            Ok(ColorFinder {
                color_tree: create_tree(data_path)
            })
        }

        method getColorName(mut cx) {
            let r: f32 = cx.argument::<JsNumber>(0)?.value() as f32;
            let g: f32 = cx.argument::<JsNumber>(1)?.value() as f32;
            let b: f32 = cx.argument::<JsNumber>(2)?.value() as f32;

            let this = cx.this();
            let color = {
                let guard = cx.lock();
                let color_finder = this.borrow(&guard);
                let nearest = color_finder.color_tree.nearest(&[r, g, b],1, &squared_euclidean).unwrap();
                nearest[0].1.to_owned()
            };
            Ok(cx.string(color).upcast())
        }
    }
}

register_module!(mut m, {
    m.export_class::<JsColorFinder>("ColorFinder")?;
    Ok(())
});
