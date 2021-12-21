import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const CreateQuiz = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <>
      <div className="toolbar">
        <div className="tool-section tool-section--lrg"></div>

        <div>
          <button className="btn btn--main btn--block">Add Question</button>
          <button className="btn btn--block">Clear</button>
        </div>
      </div>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="question">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    label="Question: "
                    {...restField}
                    name={[name, "question_title"]}
                    //fieldKey={[fieldKey, "first"]}
                  >
                    <Input placeholder="Input question ..." />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                  <Form.List name="question">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space
                            key={key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              label="Question: "
                              {...restField}
                              name={[name, "question_title"]}
                              //fieldKey={[fieldKey, "first"]}
                            >
                              <Input placeholder="Input question ..." />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CreateQuiz;
